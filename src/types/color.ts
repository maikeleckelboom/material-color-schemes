export type Color = string | number

export interface CustomColor {
    name: string
    value: Color
    blend?: boolean
}