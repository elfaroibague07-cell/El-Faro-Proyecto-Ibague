import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', {

  state: () => ({

    user: null as any,

    loading: false

  }),

  actions: {

    async loadSession() {

      const { data } = await supabase.auth.getSession()

      this.user = data.session?.user ?? null

    },

    async signIn(email: string, password: string) {

      this.loading = true

      try {

        const { error } = await supabase.auth.signInWithPassword({

          email,

          password

        })

        if (error) throw error

        await this.loadSession()

      } finally {

        this.loading = false

      }

    },

    async signOut() {

      await supabase.auth.signOut()

      this.user = null

    }

  }

})