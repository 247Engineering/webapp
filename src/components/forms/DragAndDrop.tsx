import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import upload from '../../assets/images/upload.svg'

import { request } from '../../helpers/request'
import { DragAndDropProps } from '../../types'

const DragAndDrop = ({ label, setData }: DragAndDropProps) => {
  const [file, setFile] = useState('')
  const [error, setError] = useState('')

  const onDrop = useCallback(
    (files: any[]) => {
      if (files[0].size / 10 ** 6 > 2) {
        setError('File is greater than 2mb')
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onerror = () => setError('Unable to read file')
      reader.onload = async () => {
        const formData = new FormData()
        formData.append('file', files[0])

        try {
          const data = await request({
            url: '/onboarding/upload',
            method: 'post',
            body: formData,
            type: 'form-data',
          })
          console.log({ data })
        } catch (err) {}

        setFile(files[0].name)
        setData(files[0].name)
      }
    },
    [setData, setFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
      'application/pdf': ['.pdf'],
    },
  })

  return (
    <>
      <label className="label">{label}</label>
      <div
        className={`mt-2 flex flex-col items-center drag-drop ${
          error ? 'error' : ''
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <img
          src={upload}
          alt="upload"
          className="w-[2rem] h-[1.4rem] mb-[1.3rem]"
        />
        <p className="font-[700] leading-[1rem] text-[0.75rem] text-center">
          {isDragActive ? (
            'Drop file here'
          ) : file ? (
            <>{file}</>
          ) : error ? (
            <>{error}</>
          ) : (
            <>
              Drag-and-drop file, or <span className="text-purple">browse</span>
            </>
          )}
        </p>
        <p className="leading-[0.875rem] text-[0.625rem] text-center">
          Supported file types: JPEG, PNG, PDF. Max file size: 2mb
        </p>
      </div>
    </>
  )
}

export default DragAndDrop
