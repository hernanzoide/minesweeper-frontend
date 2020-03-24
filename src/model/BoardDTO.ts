export interface Square {
    id: number
    image: string
    open: boolean
  }

export interface Board {
    squares: Square[]
}