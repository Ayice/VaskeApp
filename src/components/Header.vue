<template>
    <header>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img
                        src="../assets/images/vaskeLogo.png"
                        alt="Vaske logo"
                    />
                </router-link>

                <a
                    role="button"
                    class="navbar-burger-trigger"
                    @click="showMenu()"
                >
                    <span class="navbar-burger-span"></span>
                    <span class="navbar-burger-span"></span>
                    <span class="navbar-burger-span"></span>
                </a>
            </div>

            <div class="navbar-menu" :class="show ? 'show' : ''">
                <div class="navbar-end">
                    <router-link to="/about" class="navbar-item">
                        About
                    </router-link>

                    <router-link to="/about" class="navbar-item">
                        About
                    </router-link>

                    <router-link to="/about" class="navbar-item">
                        About
                    </router-link>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Header extends Vue {
    public show = false

    showMenu() {
        this.show = !this.show
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/header.scss';
</style>
