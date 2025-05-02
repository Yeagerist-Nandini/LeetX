import express from "express"
import {isLoggedIn} from "../middleware/auth.middleware"
import { 
    addProblemToPlaylist, 
    createPlaylist, 
    deletePlaylist, 
    getAllPlaylists, 
    getPlaylistById, 
    removeProblemFromPlatlist 
} from "../controllers/playlist.controller";

const router = express.Router();

router.get('/',isLoggedIn, getAllPlaylists);

router.get('/:playlistId', isLoggedIn, getPlaylistById);

router.post('/create-playlist', isLoggedIn, createPlaylist);

router.post('/:playlistId/add-problem', isLoggedIn, addProblemToPlaylist);

router.delete('/:playlistId', isLoggedIn, deletePlaylist);

router.delete('/:playlistId/remove-problem', isLoggedIn, removeProblemFromPlatlist);

export default router;