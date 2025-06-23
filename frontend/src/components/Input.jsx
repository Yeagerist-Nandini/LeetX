import React from 'react'

const Input = ({error, register, type, name, placeholder, label}) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='label'>
                <span className='label-text text-base md:text-lg font-semibold'>{label}</span>
            </label>

            <input
                type={type}
                className={`border text-sm bg-primary/10 rounded-sm p-2 w-full pl-10 ${error ? "input-error" : ""}`}
                {...register(name)}
                placeholder={placeholder}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
        </div>
    )
}

export default Input