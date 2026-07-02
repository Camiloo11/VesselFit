import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan las variables de Supabase. Copia .env.example a .env y pega tu Project URL y anon key.'
  );
}

let projectUrl: URL;
try {
  projectUrl = new URL(supabaseUrl);
} catch {
  throw new Error(
    `EXPO_PUBLIC_SUPABASE_URL no es una URL válida: "${supabaseUrl}". ` +
      'En tu .env debe verse así: https://TU-PROYECTO.supabase.co ' +
      '(con el https:// incluido, sin comillas y sin espacios).'
  );
}

if (projectUrl.pathname !== '/') {
  throw new Error(
    'EXPO_PUBLIC_SUPABASE_URL debe ser la raíz del proyecto (https://TU-PROYECTO.supabase.co) ' +
      'sin ruta adicional: quita el /rest/v1 (o lo que haya después del .co) en tu .env.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // En native persistimos con AsyncStorage; en web supabase-js usa localStorage
    // por su cuenta y sabe no tocar `window` durante el render en servidor
    storage: Platform.OS === 'web' ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // En web, Supabase debe leer el token de la URL al volver del login de Google
    detectSessionInUrl: Platform.OS === 'web',
  },
});
