<template>
  <div>
    <StarField />
    <h1>Frank Maes</h1>
    <picture>
        <source srcset="/images/webp/frank.webp" type="image/webp">
        <source srcset="/images/png/frank.png" type="image/png">
        <img src="/images/png/frank.png" alt="Frank Maes">
    </picture>
    <h3>Son. Brother. Father. Friend</h3>
    <br>
    <h2>Memorial Service</h2>
    <h3>Video</h3>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube-nocookie.com/embed/w5iyC7HU2OE"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <p>If the video won't load properly, you can <a
      target="_blank"
      href="https://youtu.be/w5iyC7HU2OE">view it on YouTube</a></p>
    <br>
    <h3>Slideshow</h3>
    <iframe
    :src="'https://docs.google.com/presentation/d/e/' +
  '2PACX-1vSCsomiVl_89W-6YMBtxeZrVOmFCEbBdlWBPnXZoHzJ6M1t0H1g4sp-f' +
  'h8-Dbvpg-1uXXDjlqMXl6j2/embed?start=false&loop=false&delayms=5000'"
    frameborder="0"
    width="960"
    height="569"
    allowfullscreen="true" mozallowfullscreen="true"
    webkitallowfullscreen="true"></iframe>
    <br>
    <h3>Music</h3>
    <iframe
      src="https://open.spotify.com/embed/playlist/72ANEy087haw4ns9gr2qzu"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"></iframe>
    <br>
    <h2>Guestbook</h2>
    <ValidateForm @submit="recaptcha" :validation-schema="guestbookSchema">
      <Field name="name" as="input" v-model="name" placeholder="Your name" />
      <ErrorMessage name="name" />
      <br />
      <Field name="message" as="textarea" placeholder="Leave a nice message!" cols="30" rows="5" v-model="message" />
      <ErrorMessage name="message" />
      <br />
      <button>Sign!</button>
    </ValidateForm>
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
      <p class="text-center">
          &copy; 2018 - {{ new Date().getFullYear() }}
          Jacob McSwain.
      </p>
    </div>
  </div>
</template>

<script>
import API from './services/API';
import GuestbookPost from '@/components/GuestbookPost.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';

import StarField from '@/effects/StarField.vue';

export default {
  name: 'App',
  components: {
    Field,
    ValidateForm: Form,
    ErrorMessage,
    GuestbookPost,
    StarField,
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

        const name = this.name;
        const message = this.message;
        this.message = '';
        this.name = '';

        // Sign the guestbook
        const resp = await API.post('/add', {
          name,
          message,
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
  color: #eee;
  margin-top: 60px;
}
</style>
