import java.util.Scanner;

public class Baekjoon_1986 {
    static int[] kx = {-2, -1, 1, 2, 2, 1, -1, -2};
    static int[] ky = {1, 2, 2, 1, -1, -2, -2, -1};
    static int[] qx = {-1, -1, 0, 1, 1, 1, 0, -1};
    static int[] qy = {0, 1, 1, 1, 0, -1, -1, -1};
    static int N, M;
    static int[][] map;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        N = sc.nextInt();
        M = sc.nextInt();
        int count = 0;
        map = new int[N][M]; // 체스판 1: queen 2: knight 3: pawn 위치

        int k = sc.nextInt();
        for (int i = 0; i < k; i++)
            map[sc.nextInt() - 1][sc.nextInt() - 1] = 1;

        k = sc.nextInt();
        for (int i = 0; i < k; i++)
            map[sc.nextInt() - 1][sc.nextInt() - 1] = 2;

        k = sc.nextInt();
        for (int i = 0; i < k; i++)
            map[sc.nextInt() - 1][sc.nextInt() - 1] = 3;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (map[i][j] == 1)
                    Queen(j, i);
                else if (map[i][j] == 2)
                    Knight(j, i);
            }
        }

        for (int i = 0; i < N; i++)
            for (int j = 0; j < M; j++)
                if (map[i][j] == 0) //체스판이 0이면 Knight나 Queen의 이동 경로에 없다.
                    count++;

        System.out.println(count);
    }
    public static void Knight(int x, int y) {
        for (int i = 0; i < 8; i++) {
            int nx = x + kx[i];
            int ny = y + ky[i];

            if (nx >= 0 && nx < M && ny < N && ny >= 0)
                if (map[ny][nx] == 0) //Knight 이동 경로 체크
                    map[ny][nx] = -1;
        }
    }
    public static void Queen(int x, int y) {
        for (int i = 0; i < 8; i++) {
            int nx = x + qx[i];
            int ny = y + qy[i];

            while (nx >= 0 && nx < M && ny < N && ny >= 0 && map[ny][nx] <= 0) {
                map[ny][nx] = -1; //Queen 이동 경로 체크
                nx += qx[i];
                ny += qy[i];
            }
        }
    }
}