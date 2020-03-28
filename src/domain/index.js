import {EntryPointFactory} from '@s-ui/domain'
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
  execute: async ({repository, folderID = repository.googleFolderId}) => {
    const folderEntity = await request(
      `${API_URL}/folders/${repository.name}/${folderID}`
    )

    return {...folderEntity, id: folderID}
  }
}

const getFileInfo = {
  execute: async ({repository, fileID}) => {
    const fileEntity = await request(
      `${API_URL}/files/${repository.name}/${fileID}`
    )
    return fileEntity
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
const EntryPoint = EntryPointFactory({config, useCases})

export default EntryPoint
