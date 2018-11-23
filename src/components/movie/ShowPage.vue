<template>
    <div>
        <h1>상세 내용</h1>
    </div>
</template>

<script>
    export default {
        created: function() {
          let id = this.$route.params.id;
          this.$http.get(`/api/movies/${id}`)
            .then((response) => {
                this.movie = response.data;
                console.log(this.movie);
            });
        },
        data: function() {
          return {
            movie: {}
          }
        }
    }
</script>

<style scoped>

</style>
