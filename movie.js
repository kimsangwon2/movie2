//open API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGVlZTk5NzUwY2NkOWExOTA1ZDRlMWNiN2RmM2Q4MyIsInN1YiI6IjY1OGVhOWM1MWY3NDhiNmRlMzk4M2QyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dl1ghE54NcS5IvfmNvMbQr69R26-YzNJ8fY8xFwazyQ"
  }
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((response) => {
    let arr = response["results"];

    let movies = document.getElementById("card");
    let moviecard = (movie) => {
      let { title, overview, poster_path, vote_average, id } = movie; // 하나의 객체로 만듬

      let card = document.createElement("div");
      let titleElement = document.createElement("h2");
      let overviewElement = document.createElement("p");
      let voteaverageElement = document.createElement("p");
      let image = document.createElement("img");

      card.setAttribute("id", id); // 영화카드 id속성값을 id에 추가

      image.src = `https://image.tmdb.org/t/p/w300${poster_path}`;

      titleElement.textContent = title;
      overviewElement.textContent = overview;
      voteaverageElement.textContent = `Rating: ${vote_average}`;

      card.appendChild(image);
      card.appendChild(titleElement);
      card.appendChild(overviewElement);
      card.appendChild(voteaverageElement);

      return card;
    };
    arr.forEach((movie) => {
      let movie_card = moviecard(movie);
      movies.append(movie_card);

      movie_card.addEventListener("click", () => {
        //movie_card가 movie 하나의 객체를 다 포함하기 때문에 movie_card에 이벤트 발생
        let movieId = movie_card.getAttribute("id"); //영화카드 id의 속성값을 가져옴
        alert(`영화 ID: ${movieId}`); //영화 id값 출력

        //검색기능
        let searchinput = document.getElementById("search-input");
        let searchbtn = document.getElementById("search-btn");

        let searchresult = () => {
          let searchinputcase = searchinput.value.toLowerCase();
          let searchmoive = movie.filter(({ title }) => title.toLowerCase().includes(searchinputcase));
          movie(searchmoive);
        };
        //enter키를 누르면 event 발생
        searchinput.addEventListener("keypress", (event) => {
          if (event.code === "Enter") {
            searchresult();
          }
        });
        //버튼을 클릭할 시 event 발생
        searchbtn.addEventListener("click", searchresult);
      });
      console.log(movie_card);
    });
    //         console.log(arr); //전체 데이터
  })
  .catch((err) => console.error(err));
