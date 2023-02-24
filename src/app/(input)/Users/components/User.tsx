'use client'

export default function User(props: { name: string; age: number }) {
  
  const nameAge = props.name + ' (' + props.age + ' years old)'
  return (
    
      <input
        type="text"
        value={nameAge}
        readOnly
        className="h-5 mt-2 w-full rounded-md border-2 border-slate-400 bg-slate-300 py-5  px-2 text-black focus:outline-none"
      />  )
}
