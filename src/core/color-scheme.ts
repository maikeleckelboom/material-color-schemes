import camelCase from 'camelcase'
import type {ColorGroup, CustomColorGroup} from "@material/material-color-utilities";

/**
 * Format color name using template pattern
 *
 * @param pattern The example template pattern to format the color name to
 * @param name The default name to use in the template
 * @param suffix The suffix to append to the formatted name
 * @returns The formatted color name
 */
export function formatColorName(pattern: string, name: string, suffix?: string) {
    return camelCase(
        `${pattern
            .replace(/([A-Z])/g, `_$1`)
            .toLowerCase()
            .replace(/color/g, camelCase(name))}${suffix ? `_${suffix}` : ''}`,
    )
}

/**
 * Process a color group and return a record of color names and their ARGB values.
 *
 * @param name The default name to use in the template
 * @param colorGroup The color group to process
 * @param suffix An optional suffix to append to the color names
 * @returns A record of color names and their ARGB values
 */
export function convertGroup(colorGroup: ColorGroup, name: string, suffix?: string) {
    const result: Record<string, number> = {}
    for (const key in colorGroup) {
        const colorName = formatColorName(key, name, suffix)
        result[colorName] = colorGroup[key as keyof ColorGroup]
    }
    return result
}

/**
 * Process a custom color group and return a record of color names and their ARGB values.
 *
 * @param group The custom color group to process.
 * @param opts Options for processing the color group.
 * @returns A record of color names and their ARGB values.
 */
export function convertCustomGroup(
    group: CustomColorGroup,
    opts: { isDark?: boolean; } = {},
): Record<string, number> {
    const { isDark = false } = opts
    const { name } = group.color
    return convertGroup(isDark ? group.dark : group.light, name)
}

/**
 * Process multiple custom color groups and return a record of color names and their ARGB values.
 *
 * @param groups The custom color groups to process.
 * @param opts Options for processing the color groups.
 * @returns A record of color names and their ARGB values.
 */
export function convertAllCustomGroups(
    groups?: CustomColorGroup[],
    opts: { isDark?: boolean; } = {},
): Record<string, number> {
    return Object.assign({}, ...(groups?.map((group) => convertCustomGroup(group, opts)) || []))
}
