export default function StaticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor}
}