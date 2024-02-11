import { TestBed } from '@angular/core/testing'

import { myFlixService } from './fetch-api-data.service'

describe('myFlixService', () => {
  let service: myFlixService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(myFlixService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
