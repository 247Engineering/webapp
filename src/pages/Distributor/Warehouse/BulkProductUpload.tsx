import React from 'react'

import AppLayout from '../../../components/layouts/AppLayout'
import BackButton from '../../../components/forms/BackButton'
// import DragAndDrop from '../../../components/forms/DragAndDrop'
import IconProgressBar from '../../../components/miscellaneous/IconProgressBar'
// import Checkbox from '../../../components/forms/Checkbox'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
// import Input from '../../../components/forms/Input'

import download from '../../../assets/images/download.svg'
import step1 from '../../../assets/images/step-one-complete.svg'
import step2 from '../../../assets/images/step-two.svg'
import step3 from '../../../assets/images/step-three.svg'
import success from '../../../assets/images/import-success.svg'

const BulkProductUpload = () => {
  // const [file, setFile] = useState<string | ArrayBuffer | null>(null)
  // const [checked, setChecked] = useState(true)
  // const [name, setName] = useState('')
  // const [description, setDescription] = useState('')
  // const [price, setPrice] = useState('')
  // const [discountedPrice, setiDscountedPrice] = useState('')
  // const [costPerItem, setCostPerItem] = useState('')
  // const [sku, setSku] = useState('')
  // const [quantity, setQuantity] = useState('')
  // const [weight, setWeight] = useState('')
  // const [category, setCategory] = useState('')
  // const [subCategory, setSubCategory] = useState('')
  // const [manufacturer, setmanufacturer] = useState('')

  return (
    <>
      <AppLayout>
        <header>
          <BackButton text="Products" className="mb-2" />
          <div className="flex justify-between">
            <div>
              <h1 className="font-[700] text-[1.25rem] leading-[1.75rem] mb-2 text-black">
                Upload your inventory
              </h1>
              <p className="p text-black-100">
                Bulk upload your inventory in minutes.
              </p>
            </div>
            <img src={download} alt="upload" className="w-[2rem] h-[2rem]" />
          </div>
        </header>
        <section className="mt-6">
          <div className="p-4 mb-8">
            <IconProgressBar
              images={[step1, step2, step3]}
              subtext={['Upload file', 'Map columns', 'Completed']}
              step={0}
              totalSteps={2}
            />
          </div>
          <div className="pb-16 pt-[1.125rem]">
            <div className="rounded-[8px] border border-dashed border-green-100 bg-green-light-100 p-[1.563rem] flex flex-col items-center">
              <img
                src={success}
                alt="success"
                className="w-[2rem] h-[2rem] mb-4"
              />
              <p className="font-[700] text-[0.75rem] leading-[1rem]">
                Import completed!
              </p>
            </div>
          </div>
          <ButtonSubmit
            onClick={() => {}}
            text="Done"
            className="bg-orange text-white"
          />
          {/* <div className="mb-4">
            <DragAndDrop
              label="Upload inventory file (CSV, XLS, XML)"
              setData={setFile}
              color="orange"
              alt
            />
          </div>
          <Checkbox
            label="Update existing products"
            id="upload-checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="mb-[4.5rem]"
          /> */}
          {/* <ButtonSubmit
            onClick={() => {}}
            text="Continue"
            className="bg-orange text-white"
          /> */}
          {/* <form>
            <div className="mb-4">
              <Input
                label="Product name"
                value={name}
                onChange={setName}
                options={[{ label: 'Product name', value: 'Product name' }]}
                default="Product name"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Description"
                value={name}
                onChange={setName}
                options={[{ label: 'Description', value: 'Description' }]}
                default="Description"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Price"
                value={name}
                onChange={setName}
                options={[{ label: 'Price', value: 'Price' }]}
                default="Price"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Discounted price"
                value={name}
                onChange={setName}
                options={[
                  { label: 'Discounted price', value: 'Discounted price' },
                ]}
                default="Discounted price"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Cost per item"
                value={name}
                onChange={setName}
                options={[{ label: 'Cost per item', value: 'Cost per item' }]}
                default="Cost per item"
              />
            </div>
            <div className="mb-4">
              <Input
                label="SKU"
                value={name}
                onChange={setName}
                options={[{ label: 'SKU', value: 'SKU' }]}
                default="SKU"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Quantity"
                value={name}
                onChange={setName}
                options={[{ label: 'Quantity', value: 'Quantity' }]}
                default="Quantity"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Weight"
                value={name}
                onChange={setName}
                options={[{ label: 'Weight', value: 'Weight' }]}
                default="Weight"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Product category"
                value={name}
                onChange={setName}
                options={[
                  { label: 'Product category', value: 'Product category' },
                ]}
                default="Product category"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Product sub-category"
                value={name}
                onChange={setName}
                options={[
                  {
                    label: 'Product sub-category',
                    value: 'Product sub-category',
                  },
                ]}
                default="Product sub-category"
              />
            </div>
            <div className="mb-16">
              <Input
                label="Manufacturer"
                value={name}
                onChange={setName}
                options={[{ label: 'Manufacturer', value: 'Manufacturer' }]}
                default="Manufacturer"
              />
            </div>
            <ButtonSubmit
              onClick={() => {}}
              text="Import"
              className="bg-orange text-white"
            />
          </form> */}
        </section>
      </AppLayout>
    </>
  )
}

export default BulkProductUpload
