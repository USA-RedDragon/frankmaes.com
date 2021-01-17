<template>
  <h1>Frank Maes</h1>
  <picture>
      <source srcset="./assets/images/webp/frank.webp" type="image/webp">
      <source srcset="./assets/images/png/frank.png" type="image/png">
      <img src="assets/images/png/frank.png" alt="Frank Maes">
  </picture>
  <h3>Son. Brother. Father. Friend</h3>
  <br>
  <h2>Guestbook</h2>
  <Form @submit="recaptcha" :validation-schema="guestbookSchema">
    <Field name="name" as="input" v-model="name" placeholder="Your name" />
    <ErrorMessage name="name" />
    <br />
    <Field name="message" as="textarea" placeholder="Leave a nice message!" cols="30" rows="5" v-model="message" />
    <ErrorMessage name="message" />
    <br />
    <button>Sign!</button>
  </Form>
  <br />
  <h2>Guestbook Submissions</h2>
  <GuestbookPost
    v-for="post in this.posts"
    :key="post.name+post.message"
    :time="post.time"
    :message="post.message"
    :name="post.name"
  />
  <div class="col-lg-10 offset-lg-7">
    <br/>
    <hr/>
    <p class="text-center">
        &copy; 2018 - {{ new Date().getFullYear() }}
        Jacob McSwain.
    </p>
  </div>
</template>

<script>
import API from './services/API';
import GuestbookPost from './components/GuestbookPost';
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  name: 'App',
  components: {
    Field,
    Form,
    ErrorMessage,
    GuestbookPost,
  },
  data() {
    return {
      name: '',
      message: '',
      posts: [],
      guestbookSchema: {
        name(value) {
          if (!value) {
            return 'This field is required';
          }
          return true;
        },
        message(value) {
          if (!value) {
            return 'This field is required';
          }
          return true;
        },
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async recaptcha() {
      await this.$recaptchaLoaded();

      try {
        // Execute reCAPTCHA with action "submit".
        const recaptchaToken = await this.$recaptcha('submit');

        this.message = '';
        this.name = '';

        // Sign the guestbook
        const resp = await API.post('/add', {
          name: this.name,
          message: this.message,
          recaptchaToken,
        });

        if (!resp.data.success) {
          this.$swal({
            title: 'Error!',
            text: 'There was an error submitting. Please try again later',
            icon: 'error',
          });
        } else {
          this.$swal({
            title: 'Thanks!',
            text: 'Thank you for signing the guestbook.',
          });
          // Fire and forget
          this.fetchData();
        }
      } catch (err) {
        console.error(err);
      }
    },
    async fetchData() {
      API.get('/list').then((res) => {
        this.posts = res.data;
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
