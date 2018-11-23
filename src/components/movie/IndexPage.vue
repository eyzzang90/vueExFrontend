<template>
    <!--vue의 template에 최상위 태그가 1개만 있어야 랜더가 가능!
    Component template should contain exactly one root element-->
    <div>
        <div class="movie" style="">
          <h1>영화목록</h1>
          <div v-for="movie in movies" class="movie" style="float:left; margin:20px;">
            <img class="poster" v-bind:src="movie.poster">
            <div>
              <strong>{{movie.name}}</strong>[{{movie.year}}]<br>
              <i>{{movie.director}}</i><br>
              <router-link :to="{name: 'show', params: {id:movie.id}}">더보기</router-link>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
          this.$http.get('/api/movies')
            .then((response) => {
                this.movies = response.data
                console.log(this.movies);
            });
        },
        data() {
          return {
            movies: []
          }
        }
    }
</script>

<style scoped>

</style>
