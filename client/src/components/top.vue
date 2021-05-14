<template>
    <header class="p-2 bg-dark">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <span class="navbar-brand">Todo list Manager</span>
                <div class="container">
                    <div v-if="logged">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="collapse">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/" active-class="active">Lists</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/account" active-class="active">Account</router-link>
                                </li>
                                <li class="nav-item">
                                    <a href="#" @click="about" class="nav-link text-secondary">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else>
                    </div>
                    <div v-if="logged">
                        <button type="button" @click="logUserOut" class="btn btn-outline-primary me-2">Logout</button>
                    </div>
                    <div v-else>
                        <button type="button" @click="$router.push('login')" class="btn btn-outline-primary me-2">Login</button>
                        <button type="button" @click="$router.push('register')" class="btn btn-primary">Sign-up</button>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>
<script>
export default {
    computed: {
        logged () {
            return this.$store.state.logged
        }
    },
    methods: {
        logUserOut() {
            localStorage.removeItem("jwt");
            this.$router.push("/login");
            this.$store.commit('logout');
        },
        about() {
            this.$swal({
                title: '<span style="color:#78909C;">Todo list Manager</span>',
                html:
                '<div style="color:#839496;">Example project over the <b>MEVN</b> fullstack:</br></br>' +
                '<b>MongoDB, ExpressJS, VueJS, Node</b></br></br>' +
                '<ul>' +
                '<li> Secure autentication with JWT </li>' +
                '<li> VueJS 3 + Vuex 4 + Bootstrap5 </li>' +
                '<li> Express + MongoDB + Mongoose </li>' +
                '</ul></br></div>' +
                '<a href>' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"> <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path> </svg>' +
                '  See the source code here' +
                '</a>',
                background: '#073642',
            })
        }
    }
};
</script>