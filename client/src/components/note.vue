<template>
    <div class="container mt-5">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
            <form @submit.prevent="updateNote" class="border border-dark p-5" style="margin-top:70px !important;">
                <legend class="text-center">Edit note</legend>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" id="title" class="form-control mb-5" v-model="note.title" required/>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea id="content" rows="5" class="form-control mb-5" v-model="note.content" required/>
                </div>
                <center>
                    <button @click="$router.push('/')" class="btn btn-secondary btn-block w-25 my-4 mx-4">
                        Cancel
                    </button>
                    <button class="btn btn-success btn-block w-25 my-4 mx-4" type="submit">
                        Update
                    </button>
                </center>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            note: {
                title: "",
                content: ""
            }
        };
    },
    methods: {
        async getNote() {
            try {
                let response = await this.$http.get("/note/" + this.$route.params.id,
                    { "headers": { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                this.note = response.data;
            } catch (err) {
                this.$swal("Error", "Something Went Wrong", "error");
                console.log(err.response);
            }
        },
        async updateNote() {
            try {
                await this.$http.post("/note/" + this.$route.params.id, this.note,
                    { "headers": { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                this.newnote = { title: "", content: "" };
                this.$router.push("/");
            } catch (err) {
                console.log(err.response);
            }
        },
    },
    created() {
        this.getNote();
    }
}
</script>