import axios from 'axios'
import { host } from '../configuraciones'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**DATOS INICIALES */
const dataInicial = {
    data: {},
    habilidades: [],
    escolaridad: [],
    usuarios: [],
    login: []
}


const OBTENER_HABILIDADES_EXITO = 'OBTENER_HABILIDADES_EXITO'
const OBTENER_ESCOLARIDAD_EXITO = 'OBTENER_ESCOLARIDAD_EXITO'
const OBTENER_USUARIOS_EXITO = 'OBTENER_USUARIOS_EXITO'
const AGREGAR_USUARIO_EXITO = 'AGREGAR_USUARIO_EXITO'
const INICIAR_SESION = 'INICIAR_SESION'

export const obtenerHabilidades = createAsyncThunk(
    OBTENER_HABILIDADES_EXITO,
    async () => {
        try {
            const fullUrl = host + `Habilidades/habilidades`
            const res = await axios.get(fullUrl)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)
export const obtenerEscolaridad = createAsyncThunk(
    OBTENER_ESCOLARIDAD_EXITO,
    async () => {
        try {
            const fullUrl = host + `Escolaridad/escolaridad`
            const res = await axios.get(fullUrl)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const agregarUsuario = createAsyncThunk(
    AGREGAR_USUARIO_EXITO,
    async (data) => {
        try {

            const fullUrl = host + `Usuario/usuarios`
            const fullUrlHabilidad = host + `UsuarioHabilidades/usuario-habilidades`
            const fullUrlFoto = host + `Usuario/upload`
            let dataUsuario = {
                curp: data.curp,
                nombre: data.nombre,
                correoelectronico: data.correoElectronico,
                direccion: data.direccion,
                fechanacimiento: new Date(data.fechaNacimiento).toISOString(),
                nivelescolaridad: data.escolaridad,
                fotografias3: '',
                contrasena: data.contrasena
            }
            const formData = new FormData();
            formData.append('image', data.photo)

            await axios.post(fullUrlFoto, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const res = await axios.post(fullUrl, dataUsuario)
            console.log('los datos es ', res)
            console.log('los datos es ', data.skills)
            for (const i in data.skills) {
                console.log('skill:', data.skills[Number(i)]); // Corregido: data.skills
                console.log('lista:', data.listaHabilidades);

                // Filtrando por habilidades
                let filtro = data.listaHabilidades.filter(anexo => anexo.habilidad === data.skills[Number(i)]);
                console.log('Los datos del filtro:', filtro);

                if (filtro.length > 0) {
                    let datahabilidades = {
                        id_usuario: res.data.id,
                        id_habilidad: filtro[0].id
                    };

                    try {
                        // Enviar datos a la API
                        const resHabilidad = await axios.post(fullUrlHabilidad, datahabilidades);
                        console.log('Respuesta de resHabilidad:', resHabilidad.data);
                    } catch (error) {
                        console.error('Error al enviar datos:', error.message);
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
)

export const obtenerUsuarios = createAsyncThunk(
    OBTENER_USUARIOS_EXITO,
    async () => {
        try {
            const fullUrl = host + `Usuario/ObtenerTodosUsuarios`
            const res = await axios.get(fullUrl)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)
export const iniciarSesion = createAsyncThunk(
    INICIAR_SESION,
    async (data) => {
        try {

            const fullUrl = host + `Usuario/iniciarSesion`
            const res = await axios.post(fullUrl, data)
            return res.data.data
        } catch (error) {
            console.log(error)
        }
    }
)


export const UsuarioSlice = createSlice({
    initialState: dataInicial,
    name: 'UsuarioSlice',
    reducers: {
    },
    extraReducers: {


        [obtenerEscolaridad.fulfilled]: (state, { payload }) => {
            state.escolaridad = payload
        },
        [obtenerHabilidades.fulfilled]: (state, { payload }) => {
            state.habilidades = payload
        },
        [obtenerUsuarios.fulfilled]: (state, { payload }) => {
            state.usuarios = payload
        },
        [iniciarSesion.fulfilled]: (state, { payload }) => {
            state.login = payload
        },

    },
})

export const { } = UsuarioSlice.actions

export const UsuarioReducer = UsuarioSlice.reducer