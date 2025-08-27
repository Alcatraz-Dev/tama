import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: 'skYcmFFpnxmFADJ3EXtCVrX5wIKDgNnfCYQ1BXoOShDiAdfV5P2QkMqv81wbMa3POmX85zo3P39t2yVGIXAZEWiZw0nDhjaBTwQF0pvebUjeKFJ5oKD5wJQKtckMmDMxdUI9ZKP4IEs7XUYcHWLLtWbRTIOYbAoDUkVfTVXTd3HqmYq2UF7i'
})
