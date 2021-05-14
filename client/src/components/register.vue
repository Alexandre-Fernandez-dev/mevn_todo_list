<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form class="border border-dark p-5" style="margin-top:70px;height:auto !important;" @submit.prevent="registerUser" >
                    <legend class="text-center">Register</legend>
                    <p class="text-warning" v-if="errormessage != ''">
                        {{errormessage}}
                    </p>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" id="name" class="form-control mb-5" v-model="register.name" required />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" id="email" class="form-control mb-5" v-model="register.email" required />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" class="form-control mb-5" v-model="register.password" />
                    </div>
                    <p class="mb-4">
                        Already have an account? <router-link to="/">click here</router-link>
                    </p>
                    <center>
                        <button class="btn btn-success btn-block w-75" type="submit">
                        Register
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
            register: {
                name: "",
                email: "",
                password: ""
            }
        };
    },
  methods: {
        async registerUser() {
            try {
                let response = await this.$http.post("/user/register", this.register);
                let token = response.data.token;
                if (token) {
                    localStorage.setItem("jwt", token);
                    this.$router.push("/");
                    this.$store.commit('login');
                } else {
                    this.errormessage = "Something Went Wrong";
                }
            } catch (err) {
                let error = err.response;
                if (error.status == 409) {
                    this.errormessage = error.data.message;
                } else {
                    this.errormessage = error.data.err.message;
                }
            }
        }
    }
};
</script>