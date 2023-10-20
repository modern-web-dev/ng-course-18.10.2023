import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {BookApiService} from "./services/book-api.service";

export function provideBooks(): EnvironmentProviders {
  return makeEnvironmentProviders([BookApiService]);
}
