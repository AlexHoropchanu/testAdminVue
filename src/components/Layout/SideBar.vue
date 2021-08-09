<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4 position-fixed">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img
        src="data:image/jpeg;base64,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"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">Админка</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link to="statistic" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Статистика</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="banner-slider" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Банера / Слайдеры</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="films" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Фильмы</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="kino" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Кинотеатры</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="news" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Новости</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="promotions" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Акции</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="pages" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Страницы</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="users" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Пользователи</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="mailing" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Рассылка</p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: "Aside",
  props: {},
};
</script>

<style>
.nav-item {
  text-align: left;
}
</style>
