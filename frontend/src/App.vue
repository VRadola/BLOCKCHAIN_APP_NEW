<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import MenuSection from './components/MenuSection.vue'
import FutureLoyalty from './components/FutureLoyalty.vue'
import VisitSection from './components/VisitSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <AboutSection />
    <MenuSection />
    <FutureLoyalty />
    <VisitSection />
  </main>
  <AppFooter />
</template>
