/*
ID: jasonl91
PROG: transform
LANG: C++11
*/
#include <iostream>
#include <fstream>

using namespace std;

void readFileToArr( int N, char* arr[N][N], ifstream fin) {
	string line;
	for(int i = 0; i < N; i++) {
  	fin >> line;
  	for(int j = 0; j < N; j++) {
  		arr[i][j] = line[j];
  	}
  }
}

int main() {
    ofstream fout ("transform.out");
    ifstream fin ("transform.in");

    int N;

    fin >> N;

    char original[N][N];
    char transformed[N][N];

    readFileToArr(N, original);
    // readFileToArr(transformed, N);

    for(int i = 0; i < N; i++) {
    	for(int j = 0; j < N; j++) {
    		cout << i << " " << j << " "  << original[i][j] << endl;
    	}
    }

    return 0;
}