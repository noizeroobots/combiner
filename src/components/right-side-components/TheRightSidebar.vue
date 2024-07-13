<template>
  <nav class="sticky flex items-center justify-around border-t right-sidebar">
    <h2>Right Sidebar</h2>
    <ul class=" justify-around border-t">
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
      <li><a href="#">Link 4</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RightSidebar',
};
</script>

<style scoped>
.right-sidebar {
  width: 150px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.right-sidebar h2 {
  margin-top: 0;
}

.right-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.right-sidebar li {
  margin-bottom: 10px;
}

.right-sidebar a {
  text-decoration: none;
  color: #333;
}

.right-sidebar a:hover {
  text-decoration: underline;
}
</style>
