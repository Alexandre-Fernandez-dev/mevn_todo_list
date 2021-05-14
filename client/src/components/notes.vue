<template>
    <div class="container mt-5">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center" v-for="note in notes" :key="note.title">
                    {{ note.title }}
                    <span class="float-end">
                    <router-link class="btn btn-dark close mx-2" :to="'/note/' + note._id" >...</router-link>
                    <button class="btn btn-dark close" aria-label="Close" @click="removeNote(note._id)">
                            <span aria-hidden="true">&times;</span>
                    </button>
                    </span>
                </li>
            </ul>
            <form @submit.prevent="insertNote" class="border border-dark p-5" style="margin-top:70px !important;">
                <legend class="text-center">New note</legend>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" id="title" class="form-control mb-5" v-model="newnote.title" required/>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea id="content" rows="5" class="form-control mb-5" v-model="newnote.content" required/>
                </div>
                <center>
                    <button class="btn btn-success btn-block w-75 my-4" type="submit">
                        Insert
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
            notes: {},
            newnote: {
                title: "",
                content: ""
            }
        };
    },
    methods: {
        async getNotes() {
            try {
                let response = await this.$http.get("/note/",
                    { "headers": { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                this.notes = response.data;
            } catch (err) {
                this.$swal("Error", "Something Went Wrong", "error");
                console.log(err.response);
            }
        },
        async insertNote() {
            try {
                await this.$http.post("/note/insert", this.newnote,
                    { "headers": { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                this.getNotes();
                this.newnote = { title: "", content: "" };
            } catch (err) {
                console.log(err.response);
            }
        },
        async removeNote(id) {
            try {
                await this.$http.delete("/note/"+id,
                    { "headers": { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                this.getNotes();
            } catch (err) {
                console.log(err.response);
            }
        }
    },
    created() {
        this.getNotes();
    }
}
</script>