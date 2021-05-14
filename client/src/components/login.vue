<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form class="border border-dark p-5" style="margin-top:70px;height:auto !important;" @submit.prevent="loginUser">
                    <legend class="text-center">Login</legend>
                    <p class="text-warning" v-if="errormessage != ''">
                        {{errormessage}}
                    </p>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="text" id="email" class="form-control mb-5" placeholder="Email" v-model="login.email"/>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" class="form-control mb-5" placeholder="Password" v-model="login.password"/>
                    </div>
                    <p class="mb-4">
                        Dont have an account? <router-link to="/register">click here</router-link>
                    </p>
                    <center>
                        <button class="btn btn-success btn-block w-75" type="submit">
                            Sign in
                        </button>
                    </center>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            errormessage: "",
            login: {
                email: "",
                password: ""
            }
          };
    },
    methods: {
        async loginUser() {
            try {
                let response = await this.$http.post("/user/login", this.login);
                let token = response.data.token;
                localStorage.setItem("jwt", token);
                if (token) {
                    this.$router.push("/");
                    this.$store.commit('login');
                }
            } catch (err) {
                this.errormessage = "Invalid credentials";
                console.log(err.response)
            }
          }
      }
};
</script>