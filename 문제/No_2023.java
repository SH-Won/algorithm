import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main{
    static int length;
    static StringBuilder sb = new StringBuilder();
    static boolean isPrime(int number){
        if(number == 1) return false;
        for(int i=2; i<=Math.sqrt(number); i++){
            if(number % i == 0) return false;
        }
        return true;
    }
    static void findPrimeNumber(String str, int count){
        if(count === length){
            sb.append(str).append('\n');
            return;
        }
        for(int i=1; i<=9; i++){
            String nextStr = str+i;
            if(isPrime(Integer.parseInt(nextStr.toString()))) findPrimeNumber(nextStr,count+1);
        }
    }
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        length = Integer.parseInt(br.readLine());
        findPrimeNumber("",0);
        System.out.print(sb.toString());
    }
}