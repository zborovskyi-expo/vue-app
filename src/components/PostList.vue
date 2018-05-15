<template>
  <v-app id="inspire">
    <v-flex xs12 sm4 offset-sm4>
      <v-text-field v-model="filter" type="text" label="Filter"></v-text-field>
    </v-flex>
    <v-container fluid grid-list-md>
      <v-data-iterator :items="filteredPosts" :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination" content-tag="v-layout" row wrap >
        <v-flex slot="item" slot-scope="post" xs12 sm6 md4 lg3>
          <v-card>
            <v-card-title>
              <a class="item__link" :href="'post/'+post.item.id">{{ post.item.title }}</a>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>{{ post.item.body | truncate(100) }}</v-card-text>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-app>
</template>

<script>

  import axios from 'axios'

  export default {
    data () {
      return {
        rowsPerPageItems: [4, 8, 12],
        pagination: {
          rowsPerPage: 4
        },
        filter: '',
        filteredPosts: [],
        posts: [],
        checkIsAlphanumeric(charList){
          var regex = /^[a-zA-Z_0-9]$/,
            result = true
          charList.forEach((item)=>{
            if(!regex.test(item))
              result = false
          })
          return result
        },
        checkIsMatchTitle(chars){
          var regex = new RegExp(chars)
          var filteredPosts = []
          this.posts.forEach((item)=>{
            if(regex.test(item.title))
              filteredPosts.push(item)
          })
          return filteredPosts
        }
      }
    },
    methods: {
      fetch () {
        let that = this
        axios.get('https://jsonplaceholder.typicode.com/posts')
          .then((res) => {
            that.posts = res.data
            that.filteredPosts = that.posts
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    created () {
      this.fetch()
    },
    watch: {
      'filter': function (value) {
        if(value.length>2)
          if(this.checkIsAlphanumeric(value.split('')))
            this.filteredPosts = this.checkIsMatchTitle(value)
          else
            this.filteredPosts = []
        else
          this.filteredPosts = this.posts
      }
    }
  }
</script>