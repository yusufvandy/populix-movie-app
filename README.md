# Populix Movie App 

## Introduction

This application purposed for technical interview test at [Populix](https://info.populix.co/en/home-en/). It using public TMDB API [Version 3](https://developers.themoviedb.org/3) and [Version 4](https://developers.themoviedb.org/4)

## Usage

The application required `.env` and my TMDB credentials to run. I attached the required `.env` file and TMDB credentials to Populix test email.

**.env**
```dosini
API_KEY=
V4AUTH=
BASE_URL=https://api.themoviedb.org/
IMG_URL=https://image.tmdb.org/t/p/w500
```

## Running App

* Install [Expo Go](https://expo.dev/client) on your iOS or Android phone and connect to the same wireless network as your computer.
* Copy `.env` file to the project directory.
* `npm install -g expo-cli`
* `npm install`
* `cd ios && npx pod-install`
* `cd .. && expo start`
* Scan appeared barcode on terminal using iOS camera or scan barcode inside Expo Go for Android.