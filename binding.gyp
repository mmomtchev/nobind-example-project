{
  'targets': [
    {
      'target_name': 'example',
      # This is the only correct way to use node-addon-api with
      # exceptions enabled
      'dependencies': [ '<!@(node -p "require(\'node-addon-api\').targets"):node_addon_api_except' ],
      'sources': [
        'src/example.cc',
        'src/array.cc',
        'src/blob.cc',
        'src/map.cc'
      ],
      'include_dirs': [
        '<!@(node -p "require(\'nobind17\').include")'
      ],
      'cflags': [
        '-std=gnu++17'
      ],
      'msvs_settings': {
        'VCCLCompilerTool': {
          # /permissive- means C++ standard compliance
          'AdditionalOptions': [ '/std:c++17', '/permissive-' ]
        }
      },
      'xcode_settings': {
        'OTHER_CPLUSPLUSFLAGS': [
          '-std=gnu++17'
        ]
      }
    },
    {
      'target_name': 'action_after_build',
      'type': 'none',
      'dependencies': [ 'example' ],
      'copies': [
        {
          'files': [
            '<(PRODUCT_DIR)/example.node'
          ],
          'destination': 'lib/binding'
        }
      ]
    }
  ]
}
