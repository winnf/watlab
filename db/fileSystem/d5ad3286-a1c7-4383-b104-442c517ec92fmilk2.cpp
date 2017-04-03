/*
ID: jasonl91
PROG: milk2
LANG: C++11
*/
#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>

using namespace std;

struct Interval {
	int start;
	int end;
	Interval() : start(0), end(0) {}
	Interval(int s, int e) : start(s), end(e) {}
};

int main() {
    ofstream fout ("milk2.out");
    ifstream fin ("milk2.in");

    int N, start, end;
    fin >> N;

    Interval arr[N];

    for(int i = 0; i < N; i++) {
    	fin >> start >> end;
    	Interval interval{start, end};
    	arr[i] = interval;
    }

    sort(arr, arr + N, [](Interval a, Interval b){ return a.start < b.start; });

    vector<Interval> result{arr[0]};

    int longestIdleTime = 0;
    int longestMilkingTime = arr[0].end - arr[0].start;
    
    for(int i = 1; i < N; i++) {
    	Interval& last = result.back();
    	if(last.end < arr[i].start) { // no collision (cut)
    		// update before push because last might point to wrong location
    		longestIdleTime = max(longestIdleTime, arr[i].start - last.end); 
    		result.push_back(arr[i]);
    	} else { // collision so find which interval is longer (extend)
    		last.end = max(last.end, arr[i].end);
    		longestMilkingTime = max(longestMilkingTime, last.end - last.start);
    	}
    }

    fout << longestMilkingTime << ' ' << longestIdleTime << endl;
    return 0;
}