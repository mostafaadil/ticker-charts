<template>
  <div>
    <input class="hide-file-input" type="file" :id="id" required :name="name" accept="image/*"
      @change="onFileChange($event)" />
    <div class="file-container">
      <label class="file-label" :for="id"> {{ label }} </label>
      <label style="margin-left: 10px">{{ extLabel }}</label>
    </div>
    <figure class="
            my-3
            p-2
            d-block
            mx-auto
            avatar avatar-110
            rounded-circle
            bg-white
            shadow-sm
          ">
      <img class="" v-if="img" :src="img" alt="fileName" />
    </figure>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    label: String,
    modelValue: File,
  },
  emits: ["update:modelValue"],
  data() {
    return {
      extLabel: "No File Yet",
      img: null,
      id: null,
    };
  },
  methods: {
    onFileChange($event) {
      const file = $event.target.files[0];
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.img = reader.result;
          this.extLabel = file.name;

          this.$emit("update:modelValue", file);
        };
        reader.onerror = (error) => {
          console.log("Error ", error);
        };
      }
    },
  },
  created() {
    this.id = "a" + Math.round(Math.random() * 100000);
  },
};
</script>
<style scoped>
.file-container {
  box-shadow: 0px 0px 0px;
  display: flex;
  align-items: center;
}

.hide-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.file-label {
  color: #fff;
  background-color: #3730a3;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

input[type="file"]:focus+.file-label {
  box-shadow: 0 0 0 4px #bae6fd;
}

img {
  max-height: 110px;
}
</style>