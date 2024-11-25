import axios from 'axios'
import { host } from '../configuraciones'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**DATOS INICIALES */
const dataInicial = {
    data: {},
}

const ACTUALIZAR_CLIENTE_EXITO = 'ACTUALIZAR_CLIENTE_EXITO'
const OBTENER_CLIENTE_POR_ID_LOGIN_EXITO = 'OBTENER_CLIENTE_POR_ID_LOGIN_EXITO'
const OBTENER_CADENA_PRODUCTIVA_POR_ID_LOGIN_EXITO = 'OBTENER_CADENA_PRODUCTIVA_POR_ID_LOGIN_EXITO'
const CLIENTE_BY_NUMSOCIO = 'CLIENTE_BY_NUMSOCIO'

export const actualizarCliente = createAsyncThunk(
    ACTUALIZAR_CLIENTE_EXITO,
    async (data) => {
        try {
            const fullUrl = host + `InformacionValida/actualizarCliente`
            const res = await axios.put(fullUrl, {data: data})
        } catch (error) {
            console.log(error)
        }
    }
)

export const obtenerClienteByIdLogin = createAsyncThunk(
    OBTENER_CLIENTE_POR_ID_LOGIN_EXITO,
    async (idLogin) => {
        try {
            const fullUrl = host + `InformacionValida/obtenerClienteByIdLogin/${idLogin}`
            const res = await axios.get(fullUrl)
            return res.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const obtenerCadenaProductivaPorLogin = createAsyncThunk(
    OBTENER_CADENA_PRODUCTIVA_POR_ID_LOGIN_EXITO,
    async (idLogin) => {
        try {
            const fullUrl = host + `InformacionValida/obtenerCadenaProductivaPorLogin/${idLogin}`
            const res = await axios.get(fullUrl)
            if(res.data.data){
                const cadenaP = {}
                for (const i in res.data.data.cliente[0]?.actividadcliente) {
                    const {...actividad} = res.data.data.cliente[0]?.actividadcliente[i]
                    cadenaP[actividad.tipoactividad.actividad] = true
                }
                return cadenaP
            }
            return {}
        } catch (error) {
            console.log(error)
        }
    }
)

export const getClienteByNumsocio = createAsyncThunk(
    CLIENTE_BY_NUMSOCIO,
    async (numerosocio) => {
        try {
            const fullUrl = host + `InformacionValida/obtenerClienteConDetalleByNumeroSocio/${numerosocio}`
            const res = await axios.get(fullUrl)
            //console.log('Se obtienen los Coches: '+JSON.stringify(res))
            return res
        } catch (error) {
            console.log(error);
        }
    }
)

export const UsuarioSlice = createSlice({
    initialState: dataInicial,
    name: 'UsuarioSlice',
    reducers: {
    },
    extraReducers: {
        [actualizarCliente.fulfilled] : (state, {payload}) => {
        },
        [obtenerClienteByIdLogin.fulfilled] : (state, {payload}) => {
        },
        [obtenerCadenaProductivaPorLogin.fulfilled] : (state, {payload}) => {
            state.cadenaProductiva = payload
        },
        [getClienteByNumsocio.fulfilled] : (state, {payload}) => {
            state.cadenaProductiva = payload
        },
    },
})

export const { } = UsuarioSlice.actions

export const UsuarioReducer = UsuarioSlice.reducer