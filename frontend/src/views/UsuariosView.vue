<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'

const usuarios = ref([])
const nome = ref('')
const email = ref('')
const editando = ref(false)
const idEdicao = ref(null)
const busca = ref('')

async function carregarUsuarios() {
  const res = await api.get('/usuarios')
  usuarios.value = res.data
}

async function salvar() {

  if (!nome.value || !email.value) {
    alert('Preencha todos os campos!')
    return
  }

  if (editando.value) {
    await api.put(`/usuarios/${idEdicao.value}`, {
      nome: nome.value,
      email: email.value
    })
  } else {
    await api.post('/usuarios', {
      nome: nome.value,
      email: email.value
    })
  }

  nome.value = ''
  email.value = ''
  editando.value = false

  alert('Salvo com sucesso!')

  carregarUsuarios()
}

function editar(u) {
  nome.value = u.nome
  email.value = u.email
  idEdicao.value = u.id
  editando.value = true
}

async function deletar(id) {
  if (!confirm('Tem certeza que deseja excluir?')) return

  await api.delete(`/usuarios/${id}`)
  alert('Deletado com sucesso!')
  carregarUsuarios()
}

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(u =>
    u.nome.toLowerCase().includes(busca.value.toLowerCase())
  )
})

onMounted(carregarUsuarios)
</script>


<template>
  <div class="page">
  <div style="max-width: 600px; margin: auto; font-family: Arial;">
    
    <h1 style="text-align:center;">CRUD de Usuários</h1>

    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      <input v-model="busca" placeholder="Buscar usuário..."
      style="padding:10px; margin-bottom:10px; width:100%; border-radius:8px; border:1px solid #ccc;" />
      <input v-model="nome" placeholder="Nome" style="padding:10px; border-radius:8px; border:1px solid #ccc;" />
      <input v-model="email" placeholder="Email" style="padding:10px; border-radius:8px; border:1px solid #ccc;" />

      <button @click="salvar" style="padding:10px; background:#4CAF50; color:white; border:none; border-radius:8px;">
        {{ editando ? 'Atualizar' : 'Cadastrar' }}
      </button>
    </div>

    <ul style="list-style:none; padding:0;">
      <li v-for="u in usuariosFiltrados" :key="u.id" 
          style="background: #000;; padding:10px; margin-bottom:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
        
        <div>
          <strong>{{ u.nome }}</strong><br />
          <small>{{ u.email }}</small>
        </div>

        <div style="display:flex; gap:5px;">
          <button @click="editar(u)" style="background:#2196F3; color:white; border:none; padding:5px 10px; border-radius:5px;">
            Editar
          </button>
          <button @click="deletar(u.id)" style="background:#f44336; color:white; border:none; padding:5px 10px; border-radius:5px;">
            Excluir
          </button>
        </div>

      </li>
    </ul>

  </div>
  </div>
</template>