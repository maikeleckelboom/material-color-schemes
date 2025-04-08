import type {CustomColor} from "../types";
import type {SchemeOptions} from "./scheme.ts";

function isSchemeBasedOnSeedColor(options: SchemeOptions): boolean {
    const hasColorSource = !!options.seedColor || !!options.primary
    return (
        hasColorSource &&
        !Object.values({
            secondary: options.secondary,
            tertiary: options.tertiary,
            neutral: options.neutral,
            neutralVariant: options.neutralVariant,
        }).some(Boolean)
    )
}
