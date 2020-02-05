<template>
  <div>
    <ul>
      <li>
        <router-link to="/">Index</router-link>
      </li>
      <li>
        <router-link to="/recipes">Recipes - only logged in user</router-link>
      </li>
      <li>
        <router-link to="/about">About Page</router-link>
      </li>
    </ul>
    <nuxt />
  </div>
</template>
