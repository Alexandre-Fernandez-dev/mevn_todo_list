<template>
    <section>
        <div class="container mt-5">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1 p-5">
                <legend class="text-center mb-4">Your account</legend>
                <table class="table table-hover text-center">
                    <tbody>
                        <tr class="table-active">
                            <th scope="row">Username</th>
                            <td>{{ user.name }}</td>
                        </tr>
                        <tr class="table-active">
                            <th scope="row">Email</th>
                            <td>{{ user.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
    data() {
        return {
            user: {},
        };
    },
    methods: {
        getUserDetails() {
            let token = localStorage.getItem("jwt");
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
        }
    },
    created() {
        this.getUserDetails();
    }
};
</script>