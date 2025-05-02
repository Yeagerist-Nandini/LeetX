import { db } from "../utils/db.js";
import asyncHanlder from "../utils/asyncHandler.js"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js"


export const createPlaylist = asyncHanlder(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;

    const playlist = await db.playlist.create({
        data: {
            name,
            description,
            userId,
        },
    });

    if (!playlist) throw new ApiError(500, "Error while creating playlist");

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist created successfully"))
})


export const getAllPlaylists = asyncHanlder(async (req, res) => {
    const playlists = await db.playlist.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            problems: {
                include: {
                    problem: true,
                }
            }
        }
    });

    if (!playlists) {
        throw new ApiError(500, "Failed to fetch playlists");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlists, "Playlist fetched successfully"));
})


export const getPlaylistById = asyncHanlder(async (req, res) => {
    const { playlistId } = req.params;

    const playlist = await db.playlist.findUnique({
        where: { id: playlistId },
        include: {
            problems: {
                include: {
                    problem: true,
                }
            }
        }
    });

    if (!playlist) throw new ApiError(404, "Playlist not found");

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist fetched succesfully"));
})


export const addProblemToPlaylist = asyncHanlder(async (req, res) => {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
        throw new ApiError(400, "Invalid or missing problem ids");
    }

    const playlistProblems = await db.problemInPlaylist.createMany({
        data: problemIds.map((problemId) => ({
            problemId,
            playlistId
        }))
    });

    if (!playlistProblems) throw new ApiError(500, "Failed to add problems to playlist");

    return res
        .status(200)
        .json(new ApiResponse(200, playlistProblems, "Problems added to playlist successfully"));
})


export const deletePlaylist = asyncHanlder(async (req, res) => {
    const { playlistId } = req.params;

    const deleted_playlist = await db.playlist.delete({
        where: { id: playlistId }
    });

    if (!deleted_playlist) throw new ApiError(500, "Error while deleting problem playlist");

    return res
        .status(200)
        .json(new ApiResponse(200, deleted_playlist, "Playlist deleted successfully"));

})


export const removeProblemFromPlatlist = asyncHanlder(async (req, res) => {
    const {playlistId} = req.params;
    const {problemIds} = req.body;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
        throw new ApiError(400, "Invalid or missing problem ids");
    }

    const playlistProblems = await db.problemInPlaylist.deleteMany({
        where: {
            playlistId,
            problemId: {in: problemIds}
        }
    });

    if (!playlistProblems) throw new ApiError(500, "Failed to remove problems from playlist");

    return res
        .status(200)
        .json(new ApiResponse(200, playlistProblems, "Problems removed from playlist successfully"));
})