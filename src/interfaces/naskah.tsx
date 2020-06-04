export type TypeNaskah = 'Wide Margin' | 'Double Column'
export type TypeElemen = 'ACTION' | 'CAST' | 'CHARACTER' | 'DIALOG' | 'GENERAL' | 'HEADSCENE' | 'PARENTHETICAL' | 'SHOT' | 'TRANSITION'

export interface ContentNaskah {
  id?: string,
  elemen: TypeElemen,
  text?: string
}

export interface Naskah {
  id?: any,
  type?: TypeNaskah,
  judul?: string,
  produksi?: string,
  penulis?: string,
  content?: ContentNaskah[], 
  scene?: number,
  createdAt?: number,
  updatedAt?: number,
  lock?: boolean,
}