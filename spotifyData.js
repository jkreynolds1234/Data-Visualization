d3.csv('./data/top50.csv', function(error, data) {
    if (error) throw error;
    for (var i = 0; i < data.length; i++) {
        data[i].Track_Name = data[i].Track_Name;
        data[i].Artist_Name = data[i].Artist_Name;
        data[i].Genre = data[i].Genre;
        data[i].Beats_per_minute = data[i].Beats_per_minute;
        data[i].Energy = data[i].Energy;
        data[i].Danceability = data[i].Danceability;
        data[i].Loudness_db = + data[i].Loudness_db;
        data[i].Liveness = data[i].Liveness;
        data[i].Valence = data[i].Valence;
        data[i].Length = +data[i].Length;
        data[i].Acousticness = data[i].Acousticness;
        data[i].Speechiness = data[i].Speechiness;
        data[i].Popularity = data[i].Popularity;
    }
    
    main(data);
});