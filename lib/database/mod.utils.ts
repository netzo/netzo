// NOTE: reasoning on chosing nanoid for IDs with the following alphabet and size
// from https://planetscale.com/blog/why-we-chose-nanoids-for-planetscales-api
import { customAlphabet } from "../deps/nanoid.ts";

export const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
export const DEFAULT_SIZE = 12;

export const nanoid = customAlphabet(ALPHABET, DEFAULT_SIZE);
