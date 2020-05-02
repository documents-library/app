import axios from 'axios'
import {API_URL} from '../helpers/constants'

const request = async url => (await axios(url)).data

const getOrganizationInfo = {
  execute: async ({name}) => {
    return {
      name: 'taller@',
      longName: 'Taller Vertical de Construcciones "M"',
      description:
        'Cátedras de Construcciones 1 a 3 de la Facultad de Arquitectura Urbanismo y Diseño de la Universidad Nacional de Mar del Plata.'
    }
  }
}

const getAllRepository = {
  execute: async () => {
    const repositoriesListValueObject = await request(`${API_URL}/sites`)
    return repositoriesListValueObject
  }
}

const getRepositoryInfo = {
  execute: async ({name}) => {
    const {site: siteEntity} = await request(`${API_URL}/sites/${name}`)
    return siteEntity
  }
}

const getFolderInfo = {
  execute: async ({
    organizationName,
    repository,
    folderID = repository.googleFolderId
  }) => {
    const folderEntity = await request(
      `${API_URL}/folders/${repository.name}/${folderID}`
    )
    const [parentFolderID] = folderEntity.currentFolder.parents

    const isRepoHomePage = repository.googleFolderId === folderID

    return {
      ...folderEntity,
      id: folderID,
      isRepoHomePage,
      previousPagePathname: getPreviousPathname({
        isRepoHomePage,
        parentFolderID,
        organizationName,
        repository
      })
    }
  }
}

const getFileInfo = {
  execute: async ({organizationName, repository, fileID}) => {
    const fileEntity = await request(
      `${API_URL}/files/${repository.name}/${fileID}`
    )

    const [parentFolderID] = fileEntity.parents

    return {
      ...fileEntity,
      previousPagePathname: getPreviousPathname({
        parentFolderID,
        organizationName,
        repository
      })
    }
  }
}

const config = {}

const useCases = {
  get_info_organization_use_case: getOrganizationInfo,
  get_info_repository_use_case: getRepositoryInfo,
  get_all_respository_use_case: getAllRepository,
  get_info_folder_use_case: getFolderInfo,
  get_info_file_use_case: getFileInfo
}

export default class {
  constructor() {
    this._useCases = useCases
  }

  get(useCase) {
    return this._useCases[useCase]
  }
}

function getPreviousPathname({
  isRepoHomePage,
  parentFolderID,
  organizationName,
  repository
}) {
  if (isRepoHomePage) return `/${organizationName}`
  if (parentFolderID === repository.googleFolderId)
    return `/${organizationName}/${repository.name}`

  return `/${organizationName}/${repository.name}/${parentFolderID}`
}
