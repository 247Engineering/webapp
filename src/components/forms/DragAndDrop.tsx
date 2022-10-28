import React, { useCallback, useState, CSSProperties } from 'react'
import { useDropzone } from 'react-dropzone'
import MoonLoader from 'react-spinners/MoonLoader'

import upload from '../../assets/images/upload.svg'

import { request } from '../../helpers/request'
import { DragAndDropProps } from '../../types'

const DragAndDrop = ({ label, data, setData }: DragAndDropProps) => {
  const override: CSSProperties = {
    borderColor: 'rgba(0, 0, 0, 0.6)',
    background: 'transparent',
  }

  const [file, setFile] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback(
    (files: any[]) => {
      setLoading(true)

      if (files[0].size / 10 ** 6 > 2) {
        setError('File is greater than 2mb')
        setLoading(false)
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onerror = () => {
        setError('Unable to read file')
        setLoading(false)
      }
      reader.onload = async () => {
        const formData = new FormData()
        formData.append('file', files[0])

        try {
          const { file: uploadedFile }: { file: string } = await request({
            url: '/onboarding/upload',
            method: 'post',
            body: formData,
            type: 'form-data',
          })

          setFile(files[0].name)
          setData(uploadedFile)
          setLoading(false)
        } catch (err: any) {
          setError(err.response?.data?.message || err.message)
          setLoading(false)
        }
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
        {loading ? (
          <div className="mb-[1.3rem]">
            <MoonLoader
              cssOverride={override}
              size={17.4}
              color="rgba(0, 0, 0, 0.6)"
            />
          </div>
        ) : (
          <img
            src={upload}
            alt="upload"
            className="w-[2rem] h-[1.4rem] mb-[1.3rem]"
          />
        )}
        <p
          className={`font-[700] leading-[1rem] text-[0.75rem] text-center ${
            error ? 'text-error' : ''
          }`}
        >
          {isDragActive ? (
            'Drop file here'
          ) : file ? (
            <>{file}</>
          ) : data ? (
            <>{data}</>
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
