import React from 'react';
import Select from 'react-select';
import { BsPlusLg, BsUpload } from 'react-icons/bs';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import { GrClose } from 'react-icons/gr';
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import UseNav from 'src/Hooks/Header/UseNav';
import {
  ApiGet,
  ApiGetNoAuth,
  ApiPost,
  ApiPut,
  ApiUpload,
  Bucket
} from 'src/helpers/API/ApiData';
import { ErrorToast, SuccessToast } from 'src/helpers/Toast';
import { getErrorMessage } from 'src/utils';
import { useHistory } from 'react-router-dom';
import DropDown from 'src/components/dropdown/DropDown';
import Model from 'src/components/model';
import { useSelector } from 'react-redux';
import { userProfile } from 'src/redux/reducer/profileUpdateSlice';

const Upload = () => {
  const history = useHistory();
  const navData: any = UseNav();
  const profiles = useSelector(userProfile);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useForm<any>();
  const [tags, setTags] = React.useState<any>([]);
  const [arrayOfImage, setArrayOfImage] = React.useState<any>([]);

  const [softwareData, saveSoftwareData] = React.useState<any>([]);
  const [thumbnailImage, setThumbnailImage] = React.useState<any>([]);
  const [sourceFileImage, setSourceFileImage] = React.useState<any>([]);
  const [selectedCategory, saveSelectedCategory] = React.useState<any>([]);
  const [selectedSoftware, saveSelectedSoftware] = React.useState<any>([]);
  const [submitClick, setSubmitClick] = React.useState<boolean>(false);
  const [isActiveLicence, setActiveLicence] = React.useState<boolean>(true);
  const [modal, setModal] = React.useState<boolean>(false);
  const [categoryId, setcategoryId] = React.useState<any>('');
  const [flag, setFlag] = React.useState<any>('');
  const [subCategoryId, setsubCategoryId] = React.useState<any>('');
  const [text, setText] = React.useState<any>('');

  const [dropdownOpen, setdropdownOpen] = React.useState<boolean>(false);
  const [softwaredropdownOpen, setsoftwaredropdownOpen] =
    React.useState<boolean>(false);
  const [subdropdownOpen, setsubdropdownOpen] = React.useState<boolean>(false);
  const [categoryValue, setcategoryValue] =
    React.useState<any>('Select Category');
  const [subcategoryValue, setsubcategoryValue] =
    React.useState<any>('Select Subcategory');
  const [softwareValue, setsoftwareValue] = React.useState<any>([]);
  const [prog, setProg] = React.useState<any>(0);
  const [state2, setstate2] = React.useState<any>('');
  const [isCommercialLicence, setIsCommercialLicence] =
    React.useState<boolean>(false);
  const [commercialLicencePrice, setCommercialLicencePrice] =
    React.useState<number>(0);
  const [isExtendedLicence, setisExtendedLicence] =
    React.useState<boolean>(false);
  const [extendedLicensePrice, setExtendedLicensePrice] =
    React.useState<number>(0);
  const [multipleImageLength, saveMultipleImageLength] =
    React.useState<number>(0);
  const [uploadedThumbnailImage, saveUploadedThumbnailImage] =
    React.useState<any>('');
  const [uploadedSourceFileImage, SaveUploadedSourceFileImage] =
    React.useState<any>('');
  const [multiUploadImages, saveUploadedMultipleImages] = React.useState<any>(
    []
  );
  const [validation, setvalidation] = React.useState<any>({});

  React.useEffect(() => {
    window.console.log('-------------');
    ApiGet(`/post/get_by_update_only/${history.location?.state}`).then(
      (res: any) => {
        setcategoryValue(res?.data?.post_data[0]?.category[0]?.name);
        setcategoryId(res?.data?.post_data[0]?.category[0]?._id);

        setsubcategoryValue(res?.data?.post_data[0]?.sub_category[0]?.name);
        setsubCategoryId(res?.data?.post_data[0]?.sub_category[0]?._id);

        setValue('title', res?.data?.post_data[0]?.title);
        setValue('demoURL', res?.data?.post_data[0]?.demoURL);

        setsoftwareValue(
          res?.data?.post_data[0]?.software?.map((v: any) => v?.name)
        );
        saveSelectedSoftware(
          res?.data?.post_data[0]?.software?.map((v: any) => v?._id)
        );

        let dummy = res?.data?.post_data[0]?.tag?.map((v: any) => {
          return { id: v, text: v };
        });

        setTags(dummy);
        setValue('description', res?.data?.post_data[0]?.description);

        setIsCommercialLicence(res?.data?.post_data[0]?.license?.isCommercial);
        setCommercialLicencePrice(
          res?.data?.post_data[0]?.license?.commercialPrice
        );
        setisExtendedLicence(res?.data?.post_data[0]?.license?.isExtended);
        setExtendedLicensePrice(
          res?.data?.post_data[0]?.license?.extendedPrice
        );

        saveUploadedThumbnailImage(res?.data?.post_data[0]?.thumbnail);
        setThumbnailImage([res?.data?.post_data[0]?.thumbnail]);

        setSourceFileImage([res?.data?.post_data[0]?.sourceFile]);

        saveUploadedMultipleImages(res?.data?.post_data[0]?.image);
        saveMultipleImageLength(res?.data?.post_data[0]?.image?.length);
        setArrayOfImage(res?.data?.post_data[0]?.image);
      }
    );
  }, []);

  const categoryEnums = navData?.navCategoryData.map((data: any) => {
    return { value: data._id, label: data.name };
  });

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };
  const softwaretoggle = () => {
    setsoftwaredropdownOpen(!softwaredropdownOpen);
  };
  const subtoggle = () => {
    setsubdropdownOpen(!subdropdownOpen);
  };

  useQuery(
    'fetchSoftwareData',
    () => ApiGetNoAuth('user/category?software=true'),
    {
      onSuccess: (response: any) => {
        saveSoftwareData(
          response?.data?.data.map((items: any) => {
            return { value: items._id, label: items.name };
          })
        );
      }
    }
  );

  const { mutateAsync: uploadData } = useMutation(
    async (data) => await ApiPost('/post/add', data),
    {
      onSuccess: (response: any) => {
        SuccessToast(response?.message);
        setFlag('success');
        setProg(0);
        setModal(true);
      },
      onError: (error: any) => {
        setFlag('error');
        ErrorToast(error?.message);
        setModal(true);
      }
    }
  );

  const { mutateAsync: uploadThumbnailMutate } = useMutation(
    async (data) =>
      await ApiUpload('upload/compress_image_640_480/post_thumbnail', data, {}),
    {
      onSuccess: async (response: any) => {
        await saveUploadedThumbnailImage(response?.data?.image);
      },
      onError: (error: any) => {
        ErrorToast(error?.message);
      }
    }
  );

  const uploadSourceFileMutate = (data: any) => {
    const config = {
      onUploadProgress: (progressEvent: any) => {
        let { progress } = state2;
        progress = (progressEvent.loaded / progressEvent.total) * 100;
        setProg(progress.toFixed(2));
        setstate2({ progress });
      }
    };
    ApiUpload('upload/image/source_file', data, config)
      .then((response: any) => {
        SaveUploadedSourceFileImage(response?.data?.image);
      })
      .catch((e) => {
        ErrorToast(e?.message);
      });
  };

  const handleUploadMultipleFile = async () => {
    let image1 = [];

    for (let i = 0; i < arrayOfImage.length; i++) {
      if (arrayOfImage[i].fileURL) {
        const formData = new FormData();
        formData.append('image', arrayOfImage[i]);

        await ApiUpload('upload/image/post_image', formData, {})
          .then((res: any) => {
            image1.push(res?.data?.image);
          })
          .catch(async (err) => {
            window.console.log('////');
          });
      } else {
        image1.push(arrayOfImage[i]);
      }
    }
    return image1;

    // const formData: any = new FormData();
    // let thub: any[] = [];

    // if (arrayOfImage[0]?.fileURL) {

    // }
    // await ApiUpload('upload/image/post_image', data, {}).then((res: any) => {
    //   saveUploadedMultipleImages((preValue: any) => {
    //     return [...preValue, res?.data?.image];
    //   });
    // });
  };

  const { mutateAsync: multipleUploadImageMutate } = useMutation(
    async (data) => await ApiUpload('upload/image/post_image', data, {}),
    {
      onSuccess: async (response: any) => {
        await saveUploadedMultipleImages((preValue: any) => {
          return [...preValue, response?.data?.image];
        });
      },
      onError: (error: any) => {
        ErrorToast(error?.message);
      }
    }
  );

  const handleCategoryChange = (v: any) => {
    saveSelectedCategory(v);
    setValue('subCategoryId', '');
  };
  const handleSubCategoryChange = (v: any) => {
    saveSelectedCategory(v);
    setValue('subCategoryId', '');
  };

  const handleThumbnailImage = (thumbnailImage: any) => {
    thumbnailImage.map((file: any) => {
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setThumbnailImage([file]);
    });
  };

  const handleUploadThumbnail = async () => {
    const formData: any = new FormData();
    let thub;
    if (thumbnailImage[0]?.fileURL) {
      formData.append('image', thumbnailImage[0]);
      // await ApiUpload('upload/compress_image/compress_image_640_480', formData, {})
      //   .then((res: any) => {
      //     thub = res?.data?.image;
      //   })
      //   .catch((err) => {
      //     ErrorToast(err.message);
      //   });

      uploadThumbnailMutate(formData);
      return thub;
    } else {
      thub = thumbnailImage;
      return thub;
    }
  };

  const handleSourceFileUpload = (sourceImage: any) => {
    sourceImage.map((file: any) => {
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setSourceFileImage([file]);
    });
  };

  const handleUploadSourceFile = async () => {
    const formData: any = new FormData();
    let thub: any[] = [];
    if (sourceFileImage[0]?.fileURL) {
      formData.append('image', sourceFileImage[0]);
      const config = {
        onUploadProgress: (progressEvent: any) => {
          let { progress } = state2;
          progress = (progressEvent.loaded / progressEvent.total) * 100;
          setProg(progress.toFixed(2));
          setstate2({ progress });
        }
      };
      await ApiUpload('upload/image/source_file', formData, config)
        .then((response: any) => {
          SaveUploadedSourceFileImage(response?.data?.image);
          return thub.push(response?.data?.image);
        })
        .catch((e) => {
          ErrorToast(e?.message);
        });

      // return uploadSourceFileMutate(formData);
    } else {
      thub = sourceFileImage;
      return thub;
    }
    return thub;
  };

  const handleMultipleImage = (multipleImage: any) => {
    saveMultipleImageLength(multipleImage?.length);
    multipleImage.map((file: any) => {
      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      setArrayOfImage((post: any) => [...post, file]);
    });
  };

  const handleMultiUploadImages = async () => {
    let image = [];

    for (let i = 0; i < arrayOfImage.length; i++) {
      if (arrayOfImage[i].fileURL) {
        const formData: any = new FormData();
        formData.append('image', arrayOfImage[i]);

        // await ApiUpload('upload/image/post_image', formData, {})
        //   .then((res: any) => {
        //     image.push(res?.data?.image);
        //   })
        //   .catch((err) => {
        //     ErrorToast(err.message);
        //   });
        multipleUploadImageMutate(formData);
      } else {
        image.push(arrayOfImage[i]);
      }
    }
    return image;
  };

  const deleteMultipleImage = (url: any, y: any) => {
    const images = arrayOfImage.filter((data: any) => {
      if (data.fileURL) {
        return data.fileURL !== url;
      } else {
        return data !== y;
      }
    });

    const images2 = multiUploadImages.filter((data: any) => {
      if (data.fileURL) {
        return data.fileURL !== url;
      } else {
        return data !== y;
      }
    });
    setArrayOfImage(images);
    saveUploadedMultipleImages(images2);
  };
  console.log('validation', getValues(), categoryId);

  const onSubmit = async (e: any) => {
    // e.preventdefault();
    setSubmitClick(true);
    const formData = getValues();
    let ddd = await handleUploadSourceFile();
    let ddd1 = await handleUploadMultipleFile();
    console.log('validation', validation, categoryId);

    if (!categoryId) {
      setvalidation({ ...validation, catagory: ' Category is required' });
    }
    if (categoryId && !subCategoryId) {
      setvalidation({
        ...validation,
        subCategoryId: ' subCategory is required'
      });
    }
    if (!formData?.title) {
      setvalidation({ ...validation, title: ' Title is required' });
    }
    if (!formData?.description) {
      setvalidation({ ...validation, description: ' Description is required' });
    }
    // if (!formData?.demoURL) {
    //   setvalidation({ ...validation, demoUrl: ' Url is required' });
    // }
    if (!selectedSoftware) {
      setvalidation({ ...validation, software: ' Software is required' });
    }
    if (!selectedTags) {
      setvalidation({ ...validation, tags: ' Tags is required' });
    }
    if (!uploadedThumbnailImage) {
      setvalidation({
        ...validation,
        thumbnail: ' Thumbnail Image is required'
      });
    }
    if (ddd?.length == 0) {
      setvalidation({ ...validation, source: ' Source File is required' });
    }

    if (
      categoryId &&
      subCategoryId &&
      formData?.title &&
      formData?.description &&
      // formData?.demoURL &&
      selectedSoftware &&
      selectedTags &&
      uploadedThumbnailImage &&
      ddd?.length > 0
    ) {
      const body: any = {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        title: formData?.title,
        description: formData?.description,
        software: selectedSoftware,
        demoURL: formData?.demoURL,
        tag: selectedTags || [],
        license: {
          isFree: isActiveLicence,
          isCommercial: true,
          commercialPrice: isCommercialLicence
            ? Number(commercialLicencePrice)
            : 10,
          isExtended: isExtendedLicence,
          extendedPrice: isExtendedLicence ? Number(extendedLicensePrice) : 0
        },
        thumbnail: uploadedThumbnailImage || '',
        sourceFile: ddd[0] || '',
        image: ddd1 || []
      };
      await uploadData(body);
    }
  };

  React.useEffect(() => {
    thumbnailImage?.length !== 0 && handleUploadThumbnail();
    // sourceFileImage?.length !== 0 && handleUploadSourceFile();
    // arrayOfImage?.length && handleMultiUploadImages();
  }, [thumbnailImage, sourceFileImage, arrayOfImage]);

  const handleDeleteTags = (i: any) => {
    setTags(tags.filter((_tag: any, index: any) => index !== i));
  };

  const handleAdditionTags = (tag: any) => {
    setTags([...tags, tag]);
  };

  const subCategoryEnums = React.useMemo(() => {
    return navData?.navCategoryData
      .filter((data: any) => data._id === selectedCategory)
      ?.map((values: any) => values.menu_sub_categories)[0];
    // ?.map((items: any) => {
    //   return { value: items._id, label: items.name };
    // });
  }, [selectedCategory]);

  const selectedTags = React.useMemo(() => {
    return tags.map((data: any) => {
      return data.text;
    });
  }, [handleAdditionTags]);

  const handleOpenCategry = (e: any) => {
    setcategoryId(e.target.value);
    handleCategoryChange(e.target.value);
    setcategoryValue(e.target.innerHTML);
  };
  const handleSoftware = (e: any) => {
    saveSelectedSoftware((preValue: any) => {
      return [...preValue, e.target.value];
    });

    let flag = softwareValue?.includes(e.target.innerHTML);
    if (!flag) {
      setsoftwareValue((preValue: any) => {
        return [...preValue, e.target];
      });
    }
  };
  const handleOpensubCategry = (e: any) => {
    // handleSubCategoryChange(e.target.value);
    setsubCategoryId(e.target.value);
    setsubcategoryValue(e.target.innerHTML);
  };

  const removeSoftware = (v: any) => {
    let data = softwareValue?.filter((name: any) => name !== v);
    let data2 = selectedSoftware?.filter((name: any) => name !== v.value);
    setsoftwareValue(data);
    saveSelectedSoftware(data2);
  };

  const postUpdate = async (e: any) => {
    setSubmitClick(true);
    e.preventDefault();
    const formData = getValues();
    let ddd = await handleUploadSourceFile();
    let ddd1 = await handleUploadMultipleFile();
    const body = {
      id: history.location.state,

      categoryId: categoryId,

      subCategoryId: subCategoryId,

      title: formData?.title,

      description: formData?.description,

      thumbnail: uploadedThumbnailImage || '',

      sourceFile: ddd[0] || '',

      tag: tags?.map((v: any) => v?.text),
      status: 'request',
      software: selectedSoftware,
      image: ddd1 || [],

      demoURL: formData?.demoURL,
      license: {
        isFree: isActiveLicence,
        isCommercial: true,
        commercialPrice: isCommercialLicence
          ? Number(commercialLicencePrice)
          : 10,
        isExtended: isExtendedLicence,
        extendedPrice: isExtendedLicence ? Number(extendedLicensePrice) : 0
      }
    };

    ApiPut('/post', body).then((res: any) => {
      SuccessToast(res?.message);
      history.goBack();
    });
  };
  return (
    <>
      <div className="primary-content-area container content-padding ">
        <div className="main-content-area">
          <div className="page-title-section">
            <h2>
              <span className="gradient-text">Upload</span> Item
            </h2>
          </div>

          <form className="cryptoki-form" id="upload-item-form">
            <div className="row">
              <div className="upload-column col-md-8">
                <div className="row">
                  <div className="form-field col-md-6 ">
                    <label htmlFor="item-category">Select Category</label>
                    <DropDown
                      dropdownOpen={dropdownOpen}
                      toggle={toggle}
                      categoryValue={categoryValue}
                      array={navData?.navCategoryData}
                      onClick={handleOpenCategry}
                    />

                    {categoryValue == 'Select Category' && submitClick && (
                      <p className="text-danger bold font-size=22">
                        Category is required
                      </p>
                    )}
                  </div>
                  {(subCategoryEnums?.length > 0 || history.location.state) && (
                    <div className="form-field col-md-6">
                      <label htmlFor="item-category-1">
                        Select Sub Category
                      </label>
                      <DropDown
                        dropdownOpen={subdropdownOpen}
                        toggle={subtoggle}
                        categoryValue={subcategoryValue}
                        array={subCategoryEnums ?? []}
                        onClick={handleOpensubCategry}
                      />

                      {subcategoryValue == 'Select Subcategory' &&
                        submitClick && (
                          <p className="text-danger bold font-size=22">
                            Sub Category is required
                          </p>
                        )}
                    </div>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="item-name">Title</label>
                  <input
                    type="text"
                    id="item-name"
                    placeholder="Enter your design title"
                    {...register('title', { required: true })}
                    name="title"
                  />
                  {!getValues()?.title && submitClick && (
                    <p className="text-danger bold font-size=22">
                      Title is required
                    </p>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="Demo-Url">Demo Url</label>
                  <input
                    type="text"
                    id="Demo-Url"
                    placeholder="Enter your Demo URL Here"
                    {...register('demoURL', { required: false })}
                    name="demoURL"
                  />
                  {/* {!getValues()?.demoURL && submitClick && (
                    <p className="text-danger bold font-size=22">
                      Demo Url is required
                    </p>
                  )} */}
                </div>
                <div className="form-field software">
                  <label htmlFor="item-category-2"> Software</label>
                  <DropDown
                    dropdownOpen={softwaredropdownOpen}
                    toggle={softwaretoggle}
                    categoryValue={softwareValue}
                    array={softwareData}
                    onClick={handleSoftware}
                    multiple={true}
                    removeSoftware={removeSoftware}
                    placeholder="Select Software"
                  />

                  {softwareValue?.length == 0 && submitClick && (
                    <p className="text-danger bold font-size=22">
                      Software is required
                    </p>
                  )}
                </div>
                <div className="form-field mb-4">
                  <label htmlFor="Tags">Tags</label>
                  <ReactTags
                    tags={tags}
                    autocomplete
                    autofocus={false}
                    placeholder="Enter your tags"
                    handleDelete={handleDeleteTags}
                    handleAddition={handleAdditionTags}
                  />
                  {tags?.length == 0 && submitClick && (
                    <p className="text-danger bold font-size=22 mt-2">
                      Tags is required
                    </p>
                  )}
                </div>
                <div className="purchase-type-box form-field">
                  <label htmlFor="item-category-2">Licence</label>
                  <div className="db-tabs-block">
                    <ul className="db-tabs-list">
                      <li
                        className={`licenceCenter ${
                          isActiveLicence ? 'active' : ''
                        }`}
                        // onClick={() => setActiveLicence(!isActiveLicence)}
                      >
                        <div className="purchase-type-symbol">
                          <BsUpload />
                        </div>
                        <div className="purchase-type-info">
                          <div className="purchase-type-title">
                            Free Personal Licence
                          </div>
                          <div className="purchase-type-description text-center">
                            Unimited license
                          </div>
                        </div>
                        {false && (
                          <div className="licence-input">
                            <input
                              type="number"
                              placeholder="0"
                              disabled
                              id="Price"
                            />
                          </div>
                        )}
                      </li>
                      <li
                        className={`licenceCenter ${
                          isCommercialLicence ? 'active' : ''
                        }`}
                      >
                        <div
                          className="purchase-type-symbol mt-3"
                          onClick={() =>
                            setIsCommercialLicence(!isCommercialLicence)
                          }
                        >
                          <BsUpload />
                        </div>
                        <div
                          className="purchase-type-info"
                          onClick={() =>
                            setIsCommercialLicence(!isCommercialLicence)
                          }
                        >
                          <div className="purchase-type-title">
                            Commercial Licence
                          </div>
                          <div className="purchase-type-description text-center mb-2">
                            Commercial use
                          </div>
                        </div>
                        {isCommercialLicence && (
                          <div className="licence-input">
                            <input
                              required={isCommercialLicence}
                              type="number"
                              placeholder="0"
                              id="Price"
                              value={commercialLicencePrice}
                              onChange={(event: any) => {
                                setCommercialLicencePrice(event?.target?.value);
                                setIsCommercialLicence(true);
                              }}
                            />
                          </div>
                        )}
                      </li>
                      <li
                        className={`licenceCenter ${
                          isExtendedLicence ? 'active' : ''
                        }`}
                      >
                        <div
                          className="purchase-type-symbol mt-3"
                          onClick={() =>
                            setisExtendedLicence(!isExtendedLicence)
                          }
                        >
                          <BsUpload />
                        </div>
                        <div
                          className="purchase-type-info"
                          onClick={() =>
                            setisExtendedLicence(!isExtendedLicence)
                          }
                        >
                          <div className="purchase-type-title">
                            Extended Licence
                          </div>
                          <div className="purchase-type-description text-center mb-2">
                            Can be included in a product for sale
                          </div>
                        </div>
                        {isExtendedLicence && (
                          <div className="licence-input">
                            <input
                              required={isExtendedLicence}
                              id="Price"
                              type="number"
                              placeholder="0"
                              value={extendedLicensePrice}
                              onChange={(event: any) => {
                                setExtendedLicensePrice(event?.target?.value);
                                setisExtendedLicence(true);
                              }}
                            />
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="item-description">Description</label>
                  <textarea
                    id="item-description"
                    placeholder="Enter some description"
                    cols={30}
                    rows={10}
                    {...register('description', { required: false })}
                    name="description"
                  ></textarea>
                  {!getValues()?.description && submitClick && (
                    <p className="text-danger bold font-size=22">
                      Description is required
                    </p>
                  )}
                </div>
                {/* {prog > 0 && (
                  <div
                    className="progress "
                    style={{ height: '20px', marginBottom: '20px' }}
                  >
                    <div
                      className="progress-bar progress-bar-success progress-bar-striped  "
                      role="progressbar"
                      // aria-valuemin="0"
                      // aria-valuemax="100"
                      style={{ width: `${prog}%`, fontSize: '15px' }}
                    >
                      {prog}%
                    </div>
                  </div>
                )} */}
                <input
                  className="btn btn-wide gradient-background w-100"
                  type="button"
                  onClick={history.location.state ? postUpdate : onSubmit}
                  disabled={prog > 0 ? true : false}
                  value={
                    prog > 0
                      ? 'Uploading ' + prog + '%'
                      : history.location.state
                      ? 'Update Post'
                      : 'Upload Item '
                  }
                />
              </div>

              <div className="upload-column col-md-4">
                <div className="upload-container">
                  <div className="artwork-upload">
                    <div className="label">Upload Thumbnail</div>
                    <div className="upload-box">
                      {thumbnailImage.length === 0 && (
                        <>
                          <BsUpload className="mb-2" />
                          <div className="upload-notice mb-2">
                            Max 120MB, ZIP, PNG, JPEG, MP3, MP4
                          </div>
                        </>
                      )}
                      {thumbnailImage.length !== 0 &&
                        thumbnailImage.map((files: any) => {
                          return (
                            <div className="position-relative">
                              {/* <GrClose
                                className="imagecancelButton"
                                onClick={() => setThumbnailImage([])}
                              ></GrClose> */}
                              {thumbnailImage.length !== 0 && (
                                <AiOutlineCloseCircle
                                  className="imagecancelButton cursor-pointer"
                                  onClick={() => setThumbnailImage([])}
                                ></AiOutlineCloseCircle>
                              )}
                              <img
                                src={files?.fileURL || Bucket + thumbnailImage}
                                className=""
                              />
                            </div>
                          );
                        })}
                      <Dropzone
                        onDrop={handleThumbnailImage}
                        accept={'image/*'}
                        maxFiles={1}
                        multiple={false}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            className="dropZone text-center position-relative"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />

                            {thumbnailImage.length === 0 && (
                              <div className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light">
                                Upload Thumbnail
                              </div>
                            )}
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                  {thumbnailImage.length === 0 && submitClick && (
                    <p className="text-danger bold font-size=22 mt-2">
                      Thumbnail is required
                    </p>
                  )}
                </div>
                <div className="upload-container">
                  <div className="artwork-upload">
                    <div className="label">Source file</div>
                    <div className="upload-box">
                      <BsUpload className="mb-2" />
                      <div className="upload-notice mb-2">
                        Max 120MB, PNG, JPEG, MP3, MP4
                      </div>
                      <Dropzone
                        onDrop={handleSourceFileUpload}
                        accept={'application/*'}
                        maxFiles={1}
                        multiple={false}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropZone" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light">
                              Upload Source File
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                    {sourceFileImage.length !== 0 && (
                      <div className="d-flex">
                        <p className="green mx-2 mt-10">
                          {sourceFileImage[0]?.name ??
                            sourceFileImage[0].split('/')[2]}
                        </p>
                        <AiOutlineCloseCircle
                          size={20}
                          className="fw-600 closeSource cursor-pointer closeColor"
                          onClick={() => setSourceFileImage([])}
                        ></AiOutlineCloseCircle>
                      </div>
                    )}
                  </div>
                  {sourceFileImage.length === 0 && submitClick && (
                    <p className="text-danger bold font-size=22 mt-2">
                      Source File is required
                    </p>
                  )}
                </div>
                <div className="upload-container">
                  <div className="artwork-upload">
                    <div className="label">Image</div>
                    <div
                      className={`upload-box minheight ${
                        arrayOfImage.length !== 0 && 'flex-unset'
                      }`}
                    >
                      {arrayOfImage.length === 0 && (
                        <>
                          <BsUpload className="mb-2" />
                          <div className="upload-notice mb-2">
                            Max 120MB, PNG, JPEG, MP3, MP4
                          </div>
                        </>
                      )}
                      <div className=" row mx-2">
                        {' '}
                        {arrayOfImage.length !== 0 &&
                          arrayOfImage.map((files: any) => {
                            return (
                              <div
                                className={`${
                                  arrayOfImage?.length > 1 && 'col-lg-3'
                                } position-relative  col-md-6 col-sm-3 col-6 pt-3`}
                              >
                                <AiOutlineCloseCircle
                                  className="cancelButton cursor-pointer closeColor"
                                  onClick={() =>
                                    deleteMultipleImage(files.fileURL, files)
                                  }
                                ></AiOutlineCloseCircle>
                                <img
                                  src={files?.fileURL || Bucket + files}
                                  className="multiimages mt-0"
                                />
                              </div>
                            );
                          })}
                        {arrayOfImage.length !== 0 && (
                          <div
                            className={`${
                              arrayOfImage?.length > 1 && 'col-lg-3'
                            } position-relative  col-md-6 col-sm-3 col-6 pt-3`}
                          >
                            <Dropzone
                              onDrop={handleMultipleImage}
                              multiple
                              accept={'image/*'}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div className="dropZone" {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  {/* {arrayOfImage.length === 0 && ( */}
                                  {/* <div className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light">
                                  Upload Images
                                </div> */}
                                  {/* )} */}
                                  <div className="addmore">
                                    <AiOutlinePlusCircle className="hw-20" />
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                          </div>
                        )}
                      </div>
                      <Dropzone
                        onDrop={handleMultipleImage}
                        multiple
                        accept={'image/*'}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropZone" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {arrayOfImage.length === 0 && (
                              <div className="btn btn-normal btn-dark waves-effect waves-button waves-float waves-light">
                                Upload Images
                              </div>
                            )}
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {modal && (
            <Model
              modal={modal}
              setModal={setModal}
              text={`Congratulations, ${profiles?.name}`}
              flag={flag}
              setFlag={setFlag}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;
