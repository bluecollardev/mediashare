    db = db.getSiblingDB("mediashare");
    db.getCollection("playlist_item").aggregate(
                      [
      {
        $lookup: {
          from: 'media_item',
          localField: 'mediaId',
          foreignField: '_id',
          as: 'mediaItems',
        },
      },
      {
        $unwind: {
          path: '$mediaItems',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { playlistItemId: '$_id', mediaId: '$mediaId', playlistId: '$playlistId', userId: 0 },
              '$mediaItems',
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'playlist',
          localField: 'playlistId',
          foreignField: '_id',
          as: 'playlist',
        },
      },
      {
        $unwind: {
          path: '$playlist',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
              
            _id: '$mediaId',
            playlistId: '$playlistId',
            userId: '$userId',
            playlistItemId: '$playlistItemId',
            summary: '$summary',
            isPlayable: '$isPlayable',
            description: '$description',
            category: '$category',
            title: '$title',
            playlistTitle: '$playlist.title',
          },
        },
      },
      {
            $group: { _id: '$playlistId', title: {$first: "$playlistTitle"}, mediaItems: { $push: '$$ROOT' } },
      },
    ]
    )
