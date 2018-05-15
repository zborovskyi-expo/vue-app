<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div>
                <div class="headline mb-2">{{ post.title }}</div>
                <div>Author: {{ user.username }}</div>
              </div>
            </v-card-title>
            <v-card-text>{{ post.body }}</v-card-text>
            <v-card-text>
              <v-list>
                <template v-for="(item, index) in comments">
                  <v-toolbar v-if="index==0" class="mb-2">
                    <v-subheader>Comments: </v-subheader>
                  </v-toolbar>
                  <v-divider v-else :inset="item.inset" :key="index"></v-divider>
                  <v-list-tile-content :key="item.title" class="mt-3 mb-3">
                    <v-list-tile-title>Email: {{ item.email }}</v-list-tile-title>
                    <v-list-tile-sub-title>Title: {{ item.name }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>Desc: {{ item.body }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>

  import axios from 'axios'

  export default {
    data () {
      return {
        id: this.$route.params.slug,
        post: {},
        user: {},
        comments: [],
      }
    },
    methods: {
      fetch () {
        let that = this
        axios.get('https://jsonplaceholder.typicode.com/posts/' + that.id)
          .then((res) => {
            that.post = res.data
          })
          .then(() => {
            axios.get('https://jsonplaceholder.typicode.com/users/' + that.post.userId)
              .then((res) => {
                that.user = res.data
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .then(() => {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + that.id + '/comments')
              .then((res) => {
                that.comments = res.data
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    created () {
      this.fetch()
    }
  }
</script>